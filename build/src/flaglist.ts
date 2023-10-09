export type IFileHash = {
  /** Algorithm, throw err if MD5 */
  algorithm: string,
  /** Hash Digest */
  digest: string,
} | {
  /** No Algo */
  algorithm: 'none',
  /** Hash Digest */
  digest?: undefined | null,
}
export type IFile = {
  /** File Route relative to {@link IFlagItem.base} */
  f: string,
  /** File Hash */
  h: IFileHash,
}
export type IFeature<T extends string> = {
  /** Human-Readable Name */
  name: string,
  /** Question */
  question: string,
  /** Options */
  options: {
    [key: string]: IFile[],
  },
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
  options: {
    [key: string]: IFile[],
  },
  /** Default Option */
  default: T,
  /** Multiple Choice */
  multiple: false,
}
export type IFlagItem = {
  /** Base URL - e.g. https://rfo.sh/flags/ */
  baseurl: string,
  /** Git clone URL - e.g. https://github.com/rbxflags/Flags.git or git@github.com/rbxflags/Flags.git */
  giturl: string,
  /** Git branch, defaults to 'master' */
  gitbranch?: string,
  /** Path relative to the git repository to find files in - Defaults to '.' */
  gitpath?: string,
  /** Is it enabled by default */
  default: boolean,
  /** Human-Readable Name */
  name: string,
  /** Base Flags */
  base: IFile[],
  /** Feature List */
  features: IFeature<string>[],
}
export type IFlagList = {
  [key: string]: IFlagItem,
}
