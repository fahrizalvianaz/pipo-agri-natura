"""Build pre-projected SVG paths for the PIPO origin map.

Source: geoBoundaries IDN ADM2 (regency boundaries) -- BPS-Statistics Indonesia, WFP, OCHA ROAP, CC BY 3.0 IGO.
Usage: download geoBoundaries-IDN-ADM2_simplified.geojson (https://www.geoboundaries.org) as adm2.geojson
next to this script, run `python build-origin-map.py`, then copy originMapData.ts to src/components/landing/.
"""
import json, math

SRC = json.load(open("adm2.geojson", encoding="utf-8"))["features"]

CENTRAL_JAVA = {n.lower() for n in [
    "Cilacap", "Banyumas", "Purbalingga", "Banjarnegara", "Kebumen", "Purworejo", "Wonosobo", "Magelang",
    "Boyolali", "Klaten", "Sukoharjo", "Wonogiri", "Karanganyar", "Sragen", "Grobogan", "Blora", "Rembang",
    "Pati", "Kudus", "Jepara", "Demak", "Semarang", "Temanggung", "Kendal", "Batang", "Pekalongan", "Pemalang",
    "Tegal", "Brebes", "Kota Magelang", "Kota Surakarta", "Kota Salatiga", "Kota Semarang", "Kota Pekalongan", "Kota Tegal",
]}
BALI = {n.lower() for n in ["Jembrana", "Tabanan", "Badung", "Gianyar", "Klungkung", "Bangli", "Karangasem", "Buleleng", "Kota Denpasar"]}

def rings(geom):
    polys = geom["coordinates"] if geom["type"] == "MultiPolygon" else [geom["coordinates"]]
    for poly in polys:
        for ring in poly[:1]:  # outer rings only (no holes needed at this scale)
            yield ring

def centroid(geom):
    xs = ys = n = 0
    for r in rings(geom):
        for x, y in r:
            xs += x; ys += y; n += 1
    return xs / n, ys / n

java, central, temanggung, indonesia = [], [], None, []
for f in SRC:
    name = f["properties"]["shapeName"].strip()
    low = name.lower()
    cx, cy = centroid(f["geometry"])
    indonesia.append(f)
    on_java = 105.0 <= cx <= 114.7 and -9.0 <= cy <= -5.0 and low not in BALI
    if not on_java:
        continue
    if low in CENTRAL_JAVA and 108.4 <= cx <= 111.8:
        central.append(f)
        if low == "temanggung":
            temanggung = f
    else:
        java.append(f)

assert temanggung is not None and len(central) == 35, (len(central), temanggung is None)
print("java (non-CJ) regencies:", len(java), "| central java:", len(central))

def dp(points, tol):
    """Douglas-Peucker simplification."""
    if len(points) < 3:
        return points
    (x1, y1), (x2, y2) = points[0], points[-1]
    dx, dy = x2 - x1, y2 - y1
    norm = math.hypot(dx, dy) or 1e-12
    idx, dmax = 0, -1
    for i in range(1, len(points) - 1):
        x0, y0 = points[i]
        d = abs(dy * x0 - dx * y0 + x2 * y1 - y2 * x1) / norm
        if d > dmax:
            idx, dmax = i, d
    if dmax > tol:
        return dp(points[: idx + 1], tol)[:-1] + dp(points[idx:], tol)
    return [points[0], points[-1]]

def simplify_ring(pts, tol):
    """Closed rings break DP (first == last point), so split at the point farthest from the start."""
    if pts[0] == pts[-1]:
        pts = pts[:-1]
    if len(pts) < 4:
        return pts + pts[:1]
    far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
    a = dp(pts[: far + 1], tol)
    b = dp(pts[far:] + pts[:1], tol)
    return a[:-1] + b  # b ends with the start point, closing the ring

def area(pts):
    return abs(sum(pts[i][0] * pts[i - 1][1] - pts[i - 1][0] * pts[i][1] for i in range(len(pts)))) / 2

def make_proj(lon0, lon1, lat0, lat1, w):
    # equirectangular with cos(lat) correction, good enough at this latitude
    k = math.cos(math.radians((lat0 + lat1) / 2))
    h = w * (lat0 - lat1) / ((lon1 - lon0) * k)
    return (lambda lon, lat: ((lon - lon0) / (lon1 - lon0) * w, (lat0 - lat) / (lat0 - lat1) * h)), h

def path(features, proj, tol, min_area, bbox=None, dec=1):
    out = []
    for f in features:
        for r in rings(f["geometry"]):
            if bbox:
                lons = [p[0] for p in r]; lats = [p[1] for p in r]
                if max(lons) < bbox[0] or min(lons) > bbox[1] or max(lats) < bbox[3] or min(lats) > bbox[2]:
                    continue
            pts = [proj(x, y) for x, y in r]
            pts = simplify_ring(pts, tol)
            if len(pts) < 4 or area(pts) < min_area:
                continue
            fmt = (lambda v: f"{v:.{dec}f}") if dec else (lambda v: str(round(v)))
            out.append("M" + "L".join(f"{fmt(x)} {fmt(y)}" for x, y in pts[:-1]) + "Z")
    return "".join(out)

# Main view: Central Java in context (parts of West and East Java either side)
LON0, LON1, LAT0, LAT1, W = 107.75, 112.45, -5.95, -8.45, 1000
proj, H = make_proj(LON0, LON1, LAT0, LAT1, W)
bbox = (LON0 - 0.2, LON1 + 0.2, LAT0 + 0.2, LAT1 - 0.2)
main = {
    "java": path(java, proj, 1.6, 12, bbox, dec=0),
    "central": path(central, proj, 1.1, 6, bbox, dec=0),
    "temanggung": path([temanggung], proj, 0.5, 1),
}
tc = centroid(temanggung["geometry"])
labels = {
    "temanggung": proj(*tc),
    "central": proj(109.1, -7.55),
    "javaSea": proj(110.1, -6.2),
    "indianOcean": proj(109.6, -8.25),
}

# Inset: Indonesia, everything heavily simplified, Java highlighted
ILON0, ILON1, ILAT0, ILAT1, IW = 94.8, 141.2, 6.2, -11.2, 300
iproj, IH = make_proj(ILON0, ILON1, ILAT0, ILAT1, IW)
inset = {
    "land": path([f for f in indonesia if f not in java and f not in central], iproj, 0.7, 2.5, dec=0),
    "java": path(java + central, iproj, 0.6, 0.6, dec=0),
}
fx0, fy0 = iproj(LON0, LAT0); fx1, fy1 = iproj(LON1, LAT1)

r1 = lambda v: round(v, 1)
data = {
    "viewBox": [W, r1(H)],
    "main": main,
    "labels": {k: [r1(x), r1(y)] for k, (x, y) in labels.items()},
    "inset": {"viewBox": [IW, r1(IH)], **inset, "frame": [r1(fx0), r1(fy0), r1(fx1 - fx0), r1(fy1 - fy0)]},
}
ts = '''/*
 * Pre-projected SVG paths for the origin map (generated — do not edit by hand).
 * Source: geoBoundaries IDN ADM2 (regency boundaries) — BPS-Statistics Indonesia, WFP, OCHA ROAP,
 * licensed CC BY 3.0 IGO. Simplified for display; not survey-accurate.
 */
export const originMap = ''' + json.dumps(data, separators=(",", ":")) + " as const;\n"
open("originMapData.ts", "w", encoding="utf-8").write(ts)
print("viewBox", data["viewBox"], "| inset", data["inset"]["viewBox"], "| temanggung label", data["labels"]["temanggung"])
print("sizes (chars): java", len(main["java"]), "central", len(main["central"]), "temanggung", len(main["temanggung"]),
      "inset land", len(inset["land"]), "inset java", len(inset["java"]), "| file", len(ts))
