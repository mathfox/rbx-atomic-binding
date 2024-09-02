type DEFAULT_DEPTH = 3;

type Decr = [
	never,
	0,
	1,
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	11,
	12,
	13,
	14,
	15,
	16,
	17,
	18,
	19,
	20,
	21,
	22,
	23,
	24,
	25,
	26,
	27,
	28,
	29,
	30,
	31,
	32,
	33,
	34,
	35,
	36,
	37,
	38,
	39,
	40,
	41,
	42,
	43,
	44,
	45,
	46,
	47,
	48,
	49,
	50,
	51,
	52,
	53,
	54,
	55,
	56,
	57,
	58,
	59,
	60,
	61,
	62,
	63,
	64,
	65,
	66,
	67,
	68,
	69,
	70,
	71,
	72,
	73,
	74,
	75,
	76,
	77,
	78,
	79,
	80,
	81,
	82,
	83,
	84,
	85,
	86,
	87,
	88,
	89,
	90,
	91,
	92,
	93,
	94,
	95,
	96,
	97,
	98,
	99,
	100,
];

type Slashed<TValue> = [TValue] extends [never]
	? never
	: TValue extends string
		? `/${TValue}`
		: never;

/**
 * Never pass a `Depth` value lower than 1.
 * Doing so will result in an undefined behavior.
 */
export type Paths<Root, Depth extends number = DEFAULT_DEPTH> = Depth extends 0
	? never
	: Root extends Instance
		? {
				[Key in keyof Root]: Root[Key] extends Instance
					? [Root[Key]] extends [never]
						? never
						: Key extends string
							? `${Key}` | `${Key}${Slashed<Paths<Root[Key], Decr[Depth]>>}`
							: never
					: never;
			}[keyof Root]
		: never;

/**
 * Should be used in combination with {@link Paths} type to create static path combinations.
 *
 * @example
 * ```ts
 * type PetsContainer = Index<Workspace, "__ASSETS/Pets"
 *
 * type PetPrefabPath = Paths<Index<PetsContainer, "Prefabs">>,
 *
 * type PetEffectPath = Paths<Index<PetsContainer, "Effects">>,
 * ```
 */
export type Index<TRoot, Path> = Path extends keyof TRoot
	? TRoot[Path]
	: Path extends `${infer TChildName}/${infer TRestPath}`
		? TChildName extends keyof TRoot
			? TRoot[TChildName] extends Instance
				? Index<TRoot[TChildName], TRestPath>
				: never
			: never
		: never;

/**
 * Tries to index the instance from the provided `Path`, otherwise returns `undefined`
 */
export type TryIndex<TRoot, Path> = Path extends keyof TRoot
	? TRoot[Path]
	: Path extends `${infer TChildName}/${infer TRestPath}`
		? TChildName extends keyof TRoot
			? TRoot[TChildName] extends Instance
				? Index<TRoot[TChildName], TRestPath>
				: undefined
			: undefined
		: undefined;
