import midtransClient from "midtrans-client";

const snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

const coreApi = new midtransClient.coreApi({
    isProduction: false,
    serverKey: process.env.MIDTRANS_SERVER_KEY,
    clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// BUAT TRANSAKSI
export const createTransaction = async (req, res) => {
    try {
        const {amount, first_name, email} = req.body;

        const parameter = {
            transaction_details: {
                order_id: "ORDER-" + Date.now(),
                gross_amount: amount
            },
            credit_card: {
                secure: true
            },
            customer_details: {
                first_name,
                email
            }
        };

        const transaction = await snap.createTransaction(parameter);

        res.status(200).json({
            message: "Transaksi berhasil dibuat!",
            token: transaction.token,
            redirect_url: transaction.redirect_url
        });
    } catch (error) {
        console.error("Error createTransaction:", error);
        res.status(500).json({message: "Gagal membuat transaksi :("});
    }
};