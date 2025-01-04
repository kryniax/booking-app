import { useTranslation } from "react-i18next";
import HelmetSEO from "../components/HelmetSEO";

const PrivacyPolicy = () => {
  const { t } = useTranslation();

  return (
    <div className="max-w-4xl mx-auto p-6 dark:text-zinc-100">
      <HelmetSEO
        title="Niceplace Policy"
        description="Read our comprehensive booking policies and cancellation rules for hotel reservations."
        keywords="policy"
        pathName="/privacy"
      />
      <h1 className="text-3xl font-bold mb-8">{t("PrivacyPage.title")}</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.introduction.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-300 mb-4">
          {t("PrivacyPage.introduction.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.administrator.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-4">
          {t("PrivacyPage.administrator.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.dataScope.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-2">
          {t("PrivacyPage.dataScope.description")}
        </p>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("PrivacyPage.dataScope.items.name")}</li>
          <li className="mb-2">{t("PrivacyPage.dataScope.items.email")}</li>
          <li className="mb-2">{t("PrivacyPage.dataScope.items.phone")}</li>
          <li className="mb-2">{t("PrivacyPage.dataScope.items.address")}</li>
          <li className="mb-2">{t("PrivacyPage.dataScope.items.payment")}</li>
          <li className="mb-2">
            {t("PrivacyPage.dataScope.items.bookingHistory")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.dataScope.items.preferences")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.processingPurpose.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-2">
          {t("PrivacyPage.processingPurpose.description")}
        </p>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.booking")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.account")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.payment")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.communication")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.marketing")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.legal")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.processingPurpose.items.analysis")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.legalBasis.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("PrivacyPage.legalBasis.items.contract")}</li>
          <li className="mb-2">{t("PrivacyPage.legalBasis.items.legal")}</li>
          <li className="mb-2">
            {t("PrivacyPage.legalBasis.items.legitimate")}
          </li>
          <li className="mb-2">{t("PrivacyPage.legalBasis.items.consent")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.retentionPeriod.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">
            {t("PrivacyPage.retentionPeriod.items.account")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.retentionPeriod.items.legal")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.retentionPeriod.items.claims")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.retentionPeriod.items.consent")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.userRights.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("PrivacyPage.userRights.items.access")}</li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.rectification")}
          </li>
          <li className="mb-2">{t("PrivacyPage.userRights.items.deletion")}</li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.restriction")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.portability")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.objection")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.withdrawal")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.userRights.items.complaint")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.dataRecipients.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">
            {t("PrivacyPage.dataRecipients.items.hotels")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.dataRecipients.items.payment")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.dataRecipients.items.hosting")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.dataRecipients.items.support")}
          </li>
          <li className="mb-2">
            {t("PrivacyPage.dataRecipients.items.authorities")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.security.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("PrivacyPage.security.items.encryption")}</li>
          <li className="mb-2">{t("PrivacyPage.security.items.access")}</li>
          <li className="mb-2">{t("PrivacyPage.security.items.backup")}</li>
          <li className="mb-2">{t("PrivacyPage.security.items.procedures")}</li>
          <li className="mb-2">{t("PrivacyPage.security.items.training")}</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.cookies.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">
            {t("PrivacyPage.cookies.items.functionality")}
          </li>
          <li className="mb-2">{t("PrivacyPage.cookies.items.preferences")}</li>
          <li className="mb-2">{t("PrivacyPage.cookies.items.statistics")}</li>
          <li className="mb-2">
            {t("PrivacyPage.cookies.items.personalization")}
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.changes.title")}
        </h2>
        <p className="text-zinc-700 dark:text-zinc-400  mb-4">
          {t("PrivacyPage.changes.content")}
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">
          {t("PrivacyPage.contact.title")}
        </h2>
        <ul className="list-disc pl-6 text-zinc-700 dark:text-zinc-400 ">
          <li className="mb-2">{t("PrivacyPage.contact.items.email")}</li>
          <li className="mb-2">{t("PrivacyPage.contact.items.phone")}</li>
          <li className="mb-2">{t("PrivacyPage.contact.items.address")}</li>
        </ul>
      </section>

      <footer className="mt-8 pt-4 border-t border-slate-300">
        <p className="text-zinc-300 text-sm">{t("PrivacyPage.lastUpdate")}</p>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
