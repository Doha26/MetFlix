import {THEMOVIEDB_IMAGE_BASE_URL} from "~/constants";

export const useRessource = ({path, size}: { path: string; size: string }) => {
    return `${THEMOVIEDB_IMAGE_BASE_URL}${size}${path}`
};
