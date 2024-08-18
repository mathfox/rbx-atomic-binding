import type { Paths, TryIndex } from "..";

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

type Path = Paths<CustomWorkspace>;

class AssetsBuilder<
	const Root,
	const SubPath extends string = never,
	const Path extends Paths<Root> = Paths<Root>,
> {
	paths = new Array<string>();

	addAsset<const P extends Path>(
		path: P,
	): AssetsBuilder<Root, SubPath | P, Exclude<Path, P>> {
		this.paths.push(path);

		return this;
	}
}

type InferSubPath<B> = B extends AssetsBuilder<infer _, infer SubPath>
	? SubPath
	: never;

class StreamableAssetsBuilder<
	const Root,
	const Path extends Paths<Root> = Paths<Root>,
> {
	private paths = new Array<string>();

	addAsset<const P extends Path>(
		path: P,
	): StreamableAssetsBuilder<Root, Exclude<Path, P>> {
		this.paths.push(path);

		return this;
	}

	scoped<
		const ScopePath extends Path,
		const Builder extends AssetsBuilder<TryIndex<Root, ScopePath>>,
	>(
		path: ScopePath,
		handler: (
			builder: AssetsBuilder<
				TryIndex<Root, ScopePath>,
				never,
				Paths<TryIndex<Root, ScopePath>>
			>,
		) => Builder,
	): StreamableAssetsBuilder<
		Root,
		Exclude<Path, `${ScopePath}/${InferSubPath<Builder>}`>
	> {
		for (const subPath of handler(new AssetsBuilder()).paths) {
			this.paths.push(`${path}/${subPath}`);
		}

		return this;
	}

	build(): Set<string> {
		return new Set(this.paths);
	}
}

const builder = new StreamableAssetsBuilder<CustomWorkspace>()
	.scoped("__ASSETS", (builder) => builder.addAsset("Eggs").addAsset("Pets"))
	.scoped("__ASSETS/Eggs/Prefabs", (builder) =>
		builder.addAsset("Egg1").addAsset("Egg2"),
	)
	.scoped("__ASSETS/Pets/Prefabs", (builder) =>
		builder.addAsset("Pet1").addAsset("Pet4"),
	)
	.addAsset("__ASSETS");

const assets = builder.build();
