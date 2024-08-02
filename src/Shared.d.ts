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

export type Paths<
	Root extends Instance,
	Depth extends number = DEFAULT_DEPTH,
> = Depth extends 0
	? never
	: {
			[Key in keyof Root]: [Root[Key]] extends [never]
				? never
				: Root[Key] extends Instance
					? Key extends string
						? `${Key}` | `${Key}/${Paths<Root[Key], Decr[Depth]>}`
						: never
					: never;
		}[keyof Root];

export type Index<
	Root extends Instance,
	Path extends Paths<Root, DEFAULT_DEPTH>,
> = Path extends keyof Root
	? Root[Path]
	: Path extends `${infer ChildName}/${infer RestPath}`
		? ChildName extends keyof Root
			? Root[ChildName] extends Instance
				? RestPath extends Paths<Root[ChildName]>
					? Index<Root[ChildName], RestPath>
					: never
				: never
			: never
		: never;
