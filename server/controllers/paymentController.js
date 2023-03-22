const stripe = require('stripe')('sk_test_51L0j9AGllMoN5o7HEjHEH7qtmDvJnOWKh9I5FdTxPb98PIdcUk3X8adZssFheEfHfk4MN5Jb3JL2XwLRm6mtT97A00Gs7cdauT')
require('dotenv').config();

const payment = async (req, res) => {
    try {

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: req.body.data.name,
                            // images: [req.body.data.img],
                            description: req.body.data.desc,
                        },
                        unit_amount: req.body.data.price * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${process.env.CLIENT_URL}/checkout-success`,
            cancel_url: `${process.env.CLIENT_URL}/packages`,
        });

        res.send({ url: session.url, message: 'Successfully Payment!', success: true });

    } catch (error) {
        console.log(error.message)
        res.status(500).send({ error: error.message, message: 'Failed Pay', success: false });
    }
}

module.exports = { payment }