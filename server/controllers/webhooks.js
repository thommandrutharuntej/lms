import { Webhook } from 'svix';
import User from "../modles/User.js";

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

        await whook.verify(JSON.stringify(req.body),
            {
                "svix-id": req.headers['svix-id'],
                "svix-signature": req.headers['svix-signature'],
                "svix-timestamp": req.headers['svix-timestamp']
            })

        const { data, type } = req.body

        switch (type) {
            case 'user.created':
                const userData = new User({
                    _id: data.id,
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0].email_address,
                    imageUrl: data.image_url,
                })
                await User.create(userData)
                res.json({})
                break;

            case 'user.updated': {
                const userData = new User({
                    name: `${data.first_name} ${data.last_name}`,
                    email: data.email_addresses[0].email_address,
                    imageUrl: data.image_url,
                })
                await User.findByIdAndUpdate(data.id, userData)
                res.json({})
                break;
            }

            case 'user.deleted': {
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }


            default:
                break;
        }
        return res.status(200).json({ message: 'Webhook processed successfully' })
    }
    catch (error) {
        console.log(error)
        return res.status(400).json({ error: error.message })
    }
}