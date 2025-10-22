export default async function handler(req, res) {
  res.json({
    mongodb_uri_present: !!process.env.MONGODB_URI,
    node_env: process.env.NODE_ENV
  })
}
