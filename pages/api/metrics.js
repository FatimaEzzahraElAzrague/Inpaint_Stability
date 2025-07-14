import client from 'prom-client';

const register = new client.Registry();

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'status_code'],
  buckets: [0.1, 0.5, 1, 1.5, 2, 5]
});

register.registerMetric(httpRequestDurationMicroseconds);
client.collectDefaultMetrics({ register });

export default async function handler(req, res) {
  res.setHeader('Content-Type', register.contentType);
  res.end(await register.metrics());
}