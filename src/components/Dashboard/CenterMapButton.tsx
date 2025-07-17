interface CenterMapButtonProps {
  onClick: () => void;
}

export default function CenterMapButton({ onClick }: CenterMapButtonProps) {
  return <button onClick={onClick}>🔁 Centralizar</button>;
}
