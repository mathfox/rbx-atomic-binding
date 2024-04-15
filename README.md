# Atomic Binding

The credit for `AtomicBinding.luau` file goes to [Roblox](https://www.roblox.com).
The contents of this file were taken from [Roblox](https://www.roblox.com)-provided `AtomicBinding` ModuleScript located under the `RbxCharacterSounds` LocalScript, which itself is located in the `StarterPlayerScript` service.

## Basic Usage

```ts
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
```
