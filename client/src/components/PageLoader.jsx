export default function PageLoader() {
  return (
    <div className="page-loader" role="status" aria-live="polite" aria-label="Page is loading">
      <div className="page-loader-spinner" />
      <p>Loading, please wait...</p>
    </div>
  );
}
