import {Request, Response} from "express";
import axios from "axios"
import jsdom from 'jsdom';

const {JSDOM} = jsdom;

export class TrackController {

    public getPreviewUrl = async (req: Request, res: Response) => {
        console.log('ASDASD')
        const {data} = await axios.get(`https://open.spotify.com/embed/track/${req.params['id']}`, {responseType: 'text'});
        return res.send(this.extractPreviewUrl(data))
    }

    private extractPreviewUrl(html: string) {
        const dom = new JSDOM(html);
        const scriptElement = dom.window.document.getElementById('__NEXT_DATA__');

        if (scriptElement) {
            const jsonData = JSON.parse(scriptElement.textContent ?? '');
            return jsonData?.props?.pageProps?.state?.data?.entity?.audioPreview?.url;
        }

        return null;
    }
}