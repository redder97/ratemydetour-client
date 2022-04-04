import { DetourPost } from "../../app.definition"

import './Detour.scss';


export default ({ data, ...props }: { data: DetourPost }) => {


    return (
        <div className="detour-card my-2 p-2 d-flex">
            <div className="p-2 flex-shrink-0 picture-wrapper">
                <div className="w-100 h-100" style={{
                    backgroundImage: data.profilePictureUrl ? `url(${data.profilePictureUrl})` : 'unset',
                    backgroundColor: data.profilePictureUrl ? 'none' : 'white',
                    backgroundSize: '100% 100%',
                    backgroundPosition: 'center center',
                    backgroundRepeat: 'no-repeat'
                }}>

                </div>

            </div>
            <div className="p-2">
                <div className="title-wrapper">
                    {data.title}
                </div>
                <div className="description-wrapper">
                    {data.description}
                </div>
            </div>


        </div>
    )
}