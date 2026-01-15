import Slider from '../Slider';
import type {SliderContentProps} from '../Slider/SliderContent';

interface HeroSectionProps {
    slides: SliderContentProps[];
}

const HeroSection = ({slides}: HeroSectionProps) => {
    return (
        <div className="bg-amber-50">
            <section className="container mx-auto px-4 py-4 md:py-8">
                <div className="h-70 sm:h-87.5 md:h-112.5 lg:h-125">
                    <Slider slides={slides} height="100%"/>
                </div>
            </section>
        </div>
    );
};

export default HeroSection;
