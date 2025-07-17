interface RouteSelectorProps {
  current: number;
  total: number;
  onNext: () => void;
}

export default function RouteSelector({ current, total, onNext }: RouteSelectorProps) {
  return (
    <div style={{ marginBottom: 8 }}>
      <span>Rota: ({current + 1}/{total})</span>
      <button onClick={onNext} style={{ marginLeft: 8 }}>
        Próxima
      </button>
    </div>
  );
}
