export function Loader() {
  return (
    <div className="status" role="status" aria-live="polite">
      <div className="spinner" />
      <p>Loading destinations...</p>
    </div>
  );
}

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="status status-error" role="alert">
      <h3>Something went wrong</h3>
      <p>{message}</p>
      {onRetry && <button className="btn btn-primary" onClick={onRetry}>Try again</button>}
    </div>
  );
}

export function EmptyState({ title, message, action }) {
  return (
    <div className="status">
      <div className="empty-icon">🧭</div>
      <h3>{title}</h3>
      <p>{message}</p>
      {action}
    </div>
  );
}
