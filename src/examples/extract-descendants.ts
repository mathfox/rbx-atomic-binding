import type { Index } from "../Shared";
import type { ExtractDescendants } from "../Util";

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

type Descendants = ExtractDescendants<
	Index<CustomWorkspace, "__ASSETS/Eggs/Prefabs">
>;
