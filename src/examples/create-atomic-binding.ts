import { createAtomicBinding } from "../AtomicBinding";
import { createManifest } from "../Manifest";

interface CustomWorkspace extends WorldRoot {
	__ASSETS: Model & {
		Pets: Model & {
			Prefabs: Model & {
				Pet1: Model;
				Pet2: Model;
				Pet3: Model;
				Pet4: Model;
			};
		};
		Eggs: Model & {
			Prefabs: Model & {
				Egg1: Model & {
					mesh: MeshPart & {
						nestedMesh: MeshPart;
					};
				};
				Egg2: Model & {
					mesh: MeshPart;
				};
				Egg3: Model & {
					mesh: MeshPart;
				};
				Egg4: Model & {
					mesh: MeshPart;
				};
			};
		};
	};
}

const manifest = createManifest<CustomWorkspace, 4>()({
	egg1: "__ASSETS/Eggs/Prefabs/Egg1",
});

const binding = createAtomicBinding(manifest, ({ root, egg1 }) => {});

const explicitBinding = createAtomicBinding<CustomWorkspace, 4>()(
	{
		egg2: "__ASSETS/Eggs/Prefabs/Egg2",
		egg4: "__ASSETS/Eggs/Prefabs/Egg4",
	},
	({ root, egg2, egg4 }) => {},
);
