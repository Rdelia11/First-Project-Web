const express = require("express");
const Stripe = require("stripe");
const port = process.env.PORT || 8080;

if (process.env.NODE_ENV !== "production") {
  /**
   * This allows us to use the .env.local pattern offered by React.
   * Meaning we don't need to source our .env.local file and it does not
   * need to contain `export`, it can look like that:
   *
   * REACT_APP_PUBLISHABLE_KEY="mykey"
   * REACT_APP_SECRET_KEY="myscecretkey"
   */
  const path = require("path");
  require("dotenv").config({ path: path.resolve(process.cwd(), ".env.local") });
}

const app = express();

const keyPublishable = process.env.REACT_APP_PUBLISHABLE_KEY;
const keySecret = process.env.REACT_APP_SECRET_KEY;
const stripe = Stripe(keySecret);

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));


function totalBasket(products){
  let totalBasket = 0;
  products.forEach((article) =>
  totalBasket += article.min_price * article.quantity );
  console.log(totalBasket);
return totalBasket*100
}

app.use('/static',express.static('build/static'));


app.post("/charge", (request, result) => {
  console.log(request.body.products)
  // here we need to calculate the price to pay depending on request infos
  const amount = totalBasket(request.body.products);

  console.log(request.body.stripeData);

  stripe.customers
    .create({
      email: request.body.stripeData.email,
      source: request.body.stripeData.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: "Sample Charge",
        currency: "eur",
        customer: customer.id
      })
    )
    .then(charge => result.json(charge))
    .catch(error => result.status(500).send(error))
});

app.get('*', (request, result) => {
  result.sendFile('./build/index.html')
});

app.listen(port,function(){
  console.log("server listening on the port"+ port);
});
