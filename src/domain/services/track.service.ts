import axios from "axios";
import {JSDOM} from 'jsdom';
import {CustomError} from "../helpers";

export class TrackService {
    public async getPreviewUrl(trackId: string): Promise<string | null> {
        try {
            const {data} = await axios.get(`https://open.spotify.com/embed/track/${trackId}`, {
                responseType: 'text',
            });
            return this.extractPreviewUrl(data);
        } catch (error) {
            throw CustomError.internalServerError('An error occurred trying to get preview_url');
        }
    }

    private extractPreviewUrl(html: string): string | null {
        const dom = new JSDOM(html);
        const scriptElement = dom.window.document.getElementById('__NEXT_DATA__');

        if (scriptElement) {
            const jsonData = JSON.parse(scriptElement.textContent ?? '');
            return jsonData?.props?.pageProps?.state?.data?.entity?.audioPreview?.url;
        }
        return null;
    }
}