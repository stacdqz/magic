export default async function handler(req, res) {
    const SUPABASE_URL = 'https://jghupbuitisxfffiajwc.supabase.co';
    const SUPABASE_KEY = 'sb_publishable_kXxkOWBSYaFuHI4JfTcs-g_RGjCvhvG';

    // 1. 获取基础信息
    const ip = req.headers['x-forwarded-for'] || 'Unknown';
    const ua = req.headers['user-agent'] || 'Unknown';

    // 2. 获取地理位置 (这是 Vercel 自动注入的 Header)
    const city = req.headers['x-vercel-ip-city'] || 'Unknown';
    const region = req.headers['x-vercel-ip-country-region'] || 'Unknown';
    const country = req.headers['x-vercel-ip-country'] || 'Unknown';

    try {
        await fetch(`${SUPABASE_URL}/rest/v1/view_logs`, {
            method: 'POST',
            headers: {
                'apikey': SUPABASE_KEY,
                'Authorization': `Bearer ${SUPABASE_KEY}`,
                'Content-Type': 'application/json',
                'Prefer': 'return=minimal'
            },
            body: JSON.stringify({
                ip_address: ip.split(',')[0],
                user_agent: ua,
                city: decodeURIComponent(city),    // 城市名（如 Shanghai）
                region: region,                    // 省份代码（如 SH）
                country: country                   // 国家（如 CN）
            })
        });

        res.status(200).json({ status: 'ok' });
    } catch (error) {
        res.status(200).json({ status: 'error' });
    }
}

