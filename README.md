# Atomic Binding

The credit for `AtomicBinding.luau` file goes to [Roblox](https://www.roblox.com).
The contents of this file were taken from [Roblox](https://www.roblox.com)-provided `AtomicBinding` ModuleScript located under the `RbxCharacterSounds` LocalScript, which itself is located in the `StarterPlayerScript` service.

## Basic Usage

Note that there is autocomplete support for alias values.
You should use slash (/) to see the possible paths.

```ts
type Character = Model & {
	Humanoid: Humanoid & {
		Animator: Animator;
	};
	HumanoidRootPart: BasePart;
};

const characterManifest = {
	animator: "Humanoid/Animator",
	humanoid: "Humanoid",
	rootPart: "HumanoidRootPart",
} satisfies Manifest<Character>;

const binding = new AtomicBinding<Character, typeof characterManifest>(
	characterManifest,
	({ root, animator, humanoid, rootPart }) => {
		// do something with "Animator"
		// do something with "Humanoid"
		// do something with "HumanoidRootPart"

		return () => {
			// Disconnect all "instances" related connections
		};
	},
);

const character = {} as Character

// some CharacterAdded event handler
binding.bindRoot(character);

// some CharacterRemoving event handler
binding.unbindRoot(character);

```
