import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";

const TermsPage = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 dark:text-zinc-100">
      <HelmetSEO
        title="Terms of Service | Niceplace Platform"
        description="Review our terms of service and user agreement for using our hotel booking platform. Understanding your rights and responsibilities."
        keywords="terms of service, user agreement, legal terms, booking conditions, service terms"
        pathName="/terms-of-service"
      />
      <h1 className="text-3xl font-bold mb-8">{t("TermsPage.title")}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.introduction.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-4">
          {t("TermsPage.introduction.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.definitions.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.definitions.items.service")}</li>
          <li className="mb-2">{t("TermsPage.definitions.items.user")}</li>
          <li className="mb-2">{t("TermsPage.definitions.items.host")}</li>
          <li className="mb-2">{t("TermsPage.definitions.items.booking")}</li>
          <li className="mb-2">{t("TermsPage.definitions.items.content")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.accountRules.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.accountRules.items.accuracy")}</li>
          <li className="mb-2">{t("TermsPage.accountRules.items.security")}</li>
          <li className="mb-2">{t("TermsPage.accountRules.items.age")}</li>
          <li className="mb-2">
            {t("TermsPage.accountRules.items.oneAccount")}
          </li>
          <li className="mb-2">
            {t("TermsPage.accountRules.items.termination")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.bookingRules.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.bookingRules.items.binding")}</li>
          <li className="mb-2">{t("TermsPage.bookingRules.items.payment")}</li>
          <li className="mb-2">
            {t("TermsPage.bookingRules.items.cancellation")}
          </li>
          <li className="mb-2">{t("TermsPage.bookingRules.items.changes")}</li>
          <li className="mb-2">{t("TermsPage.bookingRules.items.refunds")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.userObligations.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.userObligations.items.rules")}</li>
          <li className="mb-2">
            {t("TermsPage.userObligations.items.behavior")}
          </li>
          <li className="mb-2">
            {t("TermsPage.userObligations.items.content")}
          </li>
          <li className="mb-2">
            {t("TermsPage.userObligations.items.damage")}
          </li>
          <li className="mb-2">{t("TermsPage.userObligations.items.laws")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.intellectualProperty.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">
            {t("TermsPage.intellectualProperty.items.ownership")}
          </li>
          <li className="mb-2">
            {t("TermsPage.intellectualProperty.items.license")}
          </li>
          <li className="mb-2">
            {t("TermsPage.intellectualProperty.items.restrictions")}
          </li>
          <li className="mb-2">
            {t("TermsPage.intellectualProperty.items.userContent")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.liability.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.liability.items.limitation")}</li>
          <li className="mb-2">
            {t("TermsPage.liability.items.indemnification")}
          </li>
          <li className="mb-2">{t("TermsPage.liability.items.force")}</li>
          <li className="mb-2">{t("TermsPage.liability.items.thirdParty")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.disputes.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.disputes.items.law")}</li>
          <li className="mb-2">{t("TermsPage.disputes.items.jurisdiction")}</li>
          <li className="mb-2">{t("TermsPage.disputes.items.resolution")}</li>
          <li className="mb-2">{t("TermsPage.disputes.items.timeLimit")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.modification.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-4">
          {t("TermsPage.modification.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("TermsPage.contact.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("TermsPage.contact.items.email")}</li>
          <li className="mb-2">{t("TermsPage.contact.items.phone")}</li>
          <li className="mb-2">{t("TermsPage.contact.items.address")}</li>
        </ul>
      </section>

      <footer className="mt-8 pt-4 border-t border-gray-200">
        <p className="text-zinc-300 text-sm">{t("TermsPage.lastUpdate")}</p>
      </footer>
    </div>
  );
};

export default TermsPage;
