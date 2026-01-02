import Page, {
	generateMetadata as genMeta,
	revalidate as reval,
} from "../../autohandel-gebrauchtwagen/page";

export const revalidate = 3600;
export const generateMetadata = genMeta;
export default Page;
