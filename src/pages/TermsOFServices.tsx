import { useTranslation } from "react-i18next";

import { PageMeta } from "../components/common";

export default function TermsOfServices(){
    const { t } = useTranslation(); 
    return (
        <>
            <PageMeta 
                title={`${t("otherLinks.termsOfService")}`}
                description="otherLinks.termsOfService"
            />
            <h1 className="text-xl font-simi text-gray-800 mb-4">Terms of Service</h1>
            <div className="container mx-auto p-4 bg-white border border-gray-200 rounded-2xl text-gray-800">
                
                <p className="text-gray-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
                    risus vel massa tincidunt aliquam. Curabitur feugiat luctus lorem,
                    eget facilisis orci tincidunt nec. Morbi sed ipsum non velit varius
                    gravida. 
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
                    risus vel massa tincidunt aliquam. Curabitur feugiat luctus lorem,
                    eget facilisis orci tincidunt nec. Morbi sed ipsum non velit varius
                    gravida. 
                </p>
                <p className="text-gray-500 mt-4">
                    Suspendisse potenti. Vivamus eget fermentum nisl. Etiam sit amet nulla
                    id elit volutpat euismod.
                </p>

                <p  className="text-gray-500 mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec non
                    risus vel massa tincidunt aliquam. Curabitur feugiat luctus lorem,
                    eget facilisis orci tincidunt nec. Morbi sed ipsum non velit varius
                    gravida. 
                </p>
            </div>
        </>

    );
} 