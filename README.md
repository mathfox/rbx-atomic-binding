# Atomic Binding

The credit for the original source code goes to [Roblox](https://www.roblox.com).
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

// Notice how we first invoke an empty function.
const bindingFromBase = createAtomicBinding<Character>()({
    animator: "Humanoid/Animator",
    humanoid: "Humanoid",
    rootPart: "HumanoidRootPart",
}, ({ root, animator, humanoid, rootPart }) => {
    // do something with "Animator"
    // do something with "Humanoid"
    // do something with "HumanoidRootPart"

    return () => {
        // Disconnect all "instances" related connections
    };
});

const manifest = createManifest<Character>({
    animator: "Humanoid/Animator",
    humanoid: "Humanoid",
    rootPart: "HumanoidRootPart",
})

const binding = createAtomicBinding(manifest, ({ root, animator, humanoid, rootPart }) => {
    // do something with "Animator"
    // do something with "Humanoid"
    // do something with "HumanoidRootPart"

    return () => {
        // Disconnect all "instances" related connections
    };
})

const character = {} as Character

// some CharacterAdded event handler
binding.bindRoot(character);

// some CharacterRemoving event handler
binding.unbindRoot(character);

binding.destroy();

```

The "getInstanceFromPath" function is quite helpful when we just want to ensure that the instance exists at the provided path.
```ts
type SomeModel = Model & {
    Particles: Folder & {
        Particle1: ParticleEmitter;
        Particle2: ParticleEmitter;
    }
}

const someModel = {} as SomeModel

const particle = getInstanceFromPath(someModel, "Particles/Particle1")
if (!particle) {
    return
}
```

The `waitForInstanceFromPath` function does the same as the `getInstanceFromPath` function, but instead utilizes `WaitForChild` method of the Instance. This means that the return type will never be `undefined`.
