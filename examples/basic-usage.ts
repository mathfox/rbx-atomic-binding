import { AtomicBinding, Manifest } from "../src/AtomicBinding";

type Character = Model & {
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	HumanoidRootPart: BasePart;
};

const characterManifest = {
	humanoid: "Humanoid",
	rootPart: "HumanoidRootPart",
} satisfies Manifest<Character>;

const binding = new AtomicBinding<Character, typeof characterManifest>(
	characterManifest,
	({ root, humanoid, rootPart }) => {
		// do something with "Animator"
		// do something with "HumanoidRootPart"

		return () => {};
	},
);

// some CharacterAdded event handler
binding.bindRoot({} as Character);
