function Logo({ label, onClick, className = '', ...rest }) {
  return (
    <div className="image_group">
      <img src="/images/logo.png" alt="logo" className="logo" />
      <img src="/images/logo.png" alt="logo" className="logo-shadow" />
    </div>
  );
}
export default Logo;
