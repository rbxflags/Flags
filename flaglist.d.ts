
type FileHash = {
  /** Algorithm, throw err if MD5 */
  algorithm: string,
  /** Hash Digest */
  digest: string,
} | {
  /** No Algo */
  algorithm: 'none',
  /** Hash Digest */
  digest: undefined | null,
}
type File = {
  /** File Route relative to {@link FlagItem.base} */
  f: string,
  /** File Hash */
  h: FileHash,
}
type Feature<T extends string> = {
  /** Human-Readable Name */
  name: string,
  /** Question */
  question: string,
  /** Options */
  options: Record<T, File[]>,
  /** Default Option */
  default: T[],
  /** Multiple Choice */
  multiple: true,
  /** Minimum Choices */
  min: number,
  /** Maximum Choices */
  max: number,
} | {
  /** Human-Readable Name */
  name: string,
  /** Options */
  options: Record<T, File[]>,
  /** Default Option */
  default: T,
  /** Multiple Choice */
  multiple: false,
}
type FlagItem = {
  /** Base URL - e.g. https://rfo.sh/flags/ */
  baseurl: string,
  /** Git clone URL - e.g. https://github.com/rbxflags/Flags.git or git@github.com/rbxflags/Flags.git */
  giturl: string,
  /** Is it enabled by default */
  default: boolean,
  /** Human-Readable Name */
  name: string,
  /** Base Flags */
  base: File[],
  /** Feature List */
  features: Feature<any>[],
}
type FlagList = Record<string, FlagItem>
