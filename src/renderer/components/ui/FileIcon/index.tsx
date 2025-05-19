import { FC, ReactNode, useMemo } from 'react';
import {
  ReactOriginal,
  TypescriptOriginal,
  NpmOriginalWordmark,
  Html5Plain,
  SassOriginal,
  YarnOriginal,
  GitOriginal,
  EslintOriginal,
  NodejsOriginal,
  JavascriptOriginal,
  VitejsOriginal,
  Css3Plain,
  LessPlainWordmark,
  YarnLineWordmark,
  ReduxOriginal,
  DockerPlain,
} from 'devicons-react';
import { File, FileJson2, CodeXml, FolderOpen, Folder } from 'lucide-react';

interface IIconFileType {
  name: string;
  width?: number;
  height?: number;
  color?: string;
  isDirectory?: boolean;
  isDirExpand?: boolean;
}

const IconMapping: Record<string, (props: IIconFileType) => ReactNode> = {
  vite: VitejsOriginal,
  'package.json': (props) => <NpmOriginalWordmark {...props} />,
  'package-lock.json': (props) => <NpmOriginalWordmark {...props} />,
  'yarn.lock': (props) => <YarnOriginal {...props} />,
  '.yarnrc.yml': ({ width, height }) => (
    <YarnLineWordmark width={width} height={height} />
  ),
  '.gitignore': (props) => <GitOriginal {...props} />,
  '.eslintrc': (props) => <EslintOriginal {...props} />,
  '.eslintrc.json': (props) => <EslintOriginal {...props} />,
  'main.ts': (props) => <NodejsOriginal {...props} />,
  'main.js': (props) => <NodejsOriginal {...props} />,
  js: (props) => <JavascriptOriginal {...props} />,
  ts: ({ width, height, color }) => (
    <TypescriptOriginal width={width} height={height} color={color} />
  ),
  jsx: (props) => <ReactOriginal {...props} />,
  tsx: ({ width, height, color }) => (
    <ReactOriginal width={width} height={height} color={color} />
  ),
  json: (props) => <FileJson2 {...props} />,
  html: ({ width, height }) => <Html5Plain width={width} height={height} />,
  sass: ({ width, height }) => <SassOriginal width={width} height={height} />,
  scss: ({ width, height }) => <SassOriginal width={width} height={height} />,
  css: ({ width, height }) => <Css3Plain width={width} height={height} />,
  less: ({ width, height }) => (
    <LessPlainWordmark width={width} height={height} />
  ),
  store: ({ width, height }) => <ReduxOriginal width={width} height={height} />,
  docker: ({ width, height }) => <DockerPlain width={width} height={height} />,
  src: CodeXml,
};
const getIconType = ({
  name,
  color,
  height,
  width,
  isDirExpand,
  isDirectory,
}: IIconFileType) => {
  const normalizedName = name.toLowerCase();

  const getIconComponent = (): React.ElementType | undefined => {
    const customMatches = ['vite', 'store', 'docker', 'src'];
    for (const keyword of customMatches) {
      if (normalizedName.includes(keyword)) {
        return IconMapping[keyword] as any;
      }
    }

    if (IconMapping[normalizedName]) {
      return IconMapping[normalizedName] as any;
    }

    const ext = normalizedName.split('.').pop();
    if (ext && IconMapping[ext]) {
      return IconMapping[ext] as any;
    }

    const fuzzyMatch = Object.keys(IconMapping).find(
      (key) => normalizedName.includes(key) || key.includes(normalizedName),
    );

    return (fuzzyMatch ? IconMapping[fuzzyMatch] : undefined) as any;
  };

  const Icon = getIconComponent();

  if (isDirectory) {
    return isDirExpand ? (
      <FolderOpen size={width} color={color} opacity={0.5} />
    ) : (
      <Folder size={width} color={color} opacity={0.5} />
    );
  }

  const FinalIcon = Icon ?? File;
  return <FinalIcon name="icon" color={color} height={height} width={width} />;
};

type FileIconProps = IIconFileType;

const FileIcon: FC<FileIconProps> = (props) => {
  return useMemo(() => getIconType(props), [props]);
};

export default FileIcon;
