import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <div className="bg-blue-800 pb-16">
      <div className="container mx-auto flex flex-col gap-2">
        <header>
          <h1 className="text-3xl md:text-5xl text-white font-bold">
            {t("Hero.header")}
          </h1>
        </header>
        <p className="text-xl md:text-2xl text-white">
          {t("Hero.description")}
        </p>
      </div>
    </div>
  );
};

export default Hero;
