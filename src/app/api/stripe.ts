import Stripe from 'stripe';

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    let items = await req.body.map((item) => {
      // console.log("item: ", item) 
      const img = item.images[0].asset._ref;
      const newImage = img.replace('image-', 'https://cdn.sanity.io/images/vfxfwnaw/production/').replace('-webp', '.webp');

      return {
        price_data: { 
          currency: 'usd',
          product_data: { 
            name: item.name,
            images: [newImage],
          },
          unit_amount: item.price * 100,
        },
        adjustable_quantity: {
          enabled:true,
          minimum: 1,
        },
        quantity: item.quantity
      }
    })
    try {
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        line_items: items,
        success_url: `${"http://localhost:3000"}/success`,
        cancel_url: `${"http://localhost:3000/"}`,
      }

      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);
      return session;
    } catch (err) {
      console.log("erro: ", err)
      return res = {statusCode: 500};
    }
  } else {
    return res = {statusCode: 500};
  //   // res.setHeader('Allow', 'POST');
  //   // res.status(405).end('Method Not Allowed');
  }
}