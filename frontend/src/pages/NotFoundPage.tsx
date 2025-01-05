import Empty from "../components/Empty";
import { useTranslation } from "react-i18next";

const NotFoundPage = () => {
  const { t } = useTranslation();
  return (
    <Empty
      title={t("NotFoundPage.empty.alert")}
      link={t("NotFoundPage.empty.link")}
    />
  );
};

export default NotFoundPage;
