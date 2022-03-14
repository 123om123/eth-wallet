export default function handler(req, res) {
  req.body = JSON.parse(req.body);

  fetch(req.body.DBUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: `
      mutation MyMutation($wallet: JSON = "", $addressNames: JSON) {
        updateEthWalletAccountByUserId(
          input: {ethWalletAccountPatch: {wallet: $wallet, addressNames: $addressNames}, userId: "${req.body.user_id}"}
        ) {
          ethWalletAccount {
            userId
            wallet
            addressNames
          }
        }
      }
      
      `,
      variables: {
        wallet: JSON.parse(JSON.stringify(req.body.wallet)),
        addressNames: JSON.parse(JSON.stringify(req.body.addressNames)),
      },
    }),
  })
    .then((response) => {
      response.json().then((response) => {
        res.status(200).send(response);
      });
    })
    .catch((err) => {
      res.status(500).send(err);
    });
}
