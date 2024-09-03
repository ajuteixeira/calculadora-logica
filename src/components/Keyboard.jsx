import Button from "./Button";

export default function Keyboard() {
  return (
    <div className="grid grid-cols-6 gap-3 pt-4 pb-4">
      <Button format="default" color="default">
        A
      </Button>
      <Button format="default" color="default">
        B
      </Button>
      <Button format="default" color="default">
        C
      </Button>
      <Button format="default" color="default">
        D
      </Button>
      <Button format="default" color="default">
        E
      </Button>
      <Button format="default" color="default">
        (
      </Button>
      <Button format="default" color="default">
        )
      </Button>
      <Button format="default" color="default">
        ∼
      </Button>
      <Button format="default" color="default">
        ∧
      </Button>
      <Button format="default" color="default">
        ∨
      </Button>
      <Button format="default" color="default">
        →
      </Button>
      <Button format="default" color="default">
        ↔
      </Button>
    </div>
  );
}
