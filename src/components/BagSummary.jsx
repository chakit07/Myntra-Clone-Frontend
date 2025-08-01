import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51RqZ6tD2J7niTfb3HZUAuuIIOkozsAPHdML8sslHrlTRac9UYKr6EGkhlG2ucIY72QHUJZnab6rU4gEH6xq2jFNS00CILbRiGG"
); // ✅ Stripe initialized

const BagSummary = () => {
  const bagItemIds = useSelector((state) => state.bag);
  const items = useSelector((state) => state.items);

  const filteredItems = items.filter((item) => bagItemIds.includes(item.id));
  const CONVENIENCE_FEES = 99;
  let totalItem = bagItemIds.length;

  let totalMRP = 0,
    totalDiscount = 0;

  filteredItems.forEach((item) => {
    totalMRP += item.original_price;
    totalDiscount += item.original_price - item.current_price;
  });
  const finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEES;

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(`${backendUrl}/api/create-checkout-session`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: filteredItems }),
    });

    const session = await response.json();

    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      alert(result.error.message);
    }
  };

  return (
    <div className="bag-summary">
      <div className="bag-details-container">
        <div className="price-header">PRICE DETAILS({totalItem} Items) </div>
        <div className="price-item">
          <span className="price-item-tag">Total MRP</span>
          <span className="price-item-value">₹{totalMRP}</span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Discount on MRP</span>
          <span className="price-item-value priceDetail-base-discount">
            -₹{totalDiscount}
          </span>
        </div>
        <div className="price-item">
          <span className="price-item-tag">Convenience Fee</span>
          <span className="price-item-value">₹99</span>
        </div>
        <hr />
        <div className="price-footer">
          <span className="price-item-tag">Total Amount</span>
          <span className="price-item-value">₹{finalPayment}</span>
        </div>
      </div>
      <button className="btn-place-order" onClick={handleCheckout}>
        <div className="css-xjhrni">Proceed to Checkout</div>
      </button>
    </div>
  );
};

export default BagSummary;
