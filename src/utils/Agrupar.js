export const clusterPoints = (points, radius) => {
  let clusters = [];
  let visited = new Set();

  points.forEach((point, i) => {
    if (visited.has(i)) return;

    let cluster = [];
    let lat = Number(point.latitud);
    let lng = Number(point.longitud);

    points.forEach((p, j) => {
      if (i !== j) {
        let distance = Math.sqrt(
          Math.pow(lat - Number(p.latitud), 2) +
            Math.pow(lng - Number(p.longitud), 2)
        );
        if (distance < radius) {
          cluster.push({ lat: Number(p.latitud), lng: Number(p.longitud) });
          visited.add(j);
        }
      }
    });

    if (cluster.length > 2) {
      clusters.push(cluster);
    }
  });

  return clusters;
};
