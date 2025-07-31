const CancelPage = () => {
  return (
    <div style={{ textAlign: "center", padding: "3rem" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>
        You have cancelled the payment. No worries, you can try again anytime.
      </p>
      <a href="/" style={{ textDecoration: "underline" }}>
        Go back to Bag
      </a>
    </div>
  );
};

export default CancelPage;
