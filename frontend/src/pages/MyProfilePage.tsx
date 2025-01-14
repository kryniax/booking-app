import { useTranslation } from "react-i18next";
import { useDeleteUser, useGetCurrentUser } from "../api/UserApi";
import { Link } from "react-router-dom";
import HelmetSEO from "../components/HelmetSEO";
import EditUserForm from "../forms/edit-user-form/EditUserForm";
import Empty from "../components/Empty";
import PulseLoader from "react-spinners/PulseLoader";
import Modal from "../components/Modal";
import ModalOperationConfirmation from "../components/ModalOperationConfirmation";
import { useState } from "react";

const MyProfilePage = () => {
  const { t } = useTranslation();
  const { currentUser, isLoading } = useGetCurrentUser();
  const { deleteUser, isPending, isSuccess } = useDeleteUser();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center py-10">
        <PulseLoader color="#1e40af" size={25} />
      </div>
    );
  }

  if (!currentUser) {
    return (
      <Empty
        title={t("MyProfilePage.noUser")}
        link={t("BookingApp.back")}
        href={-1}
      />
    );
  }

  const deleteUserHandler = async () => {
    try {
      await deleteUser();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col gap-7">
      <HelmetSEO
        title="My Profile | Account Informations"
        description="Check your account information."
        keywords="user profile, personal information"
        pathName="/profile"
      />
      <div>
        <header>
          <h2 className="font-bold text-3xl dark:text-zinc-100">
            {t("Header.myProfile")}
          </h2>
        </header>
      </div>
      <div className="flex flex-col lg:flex-row border rounded-md border-zinc-300 dark:border-zinc-700 dark:bg-zinc-800">
        <div className="flex flex-1 flex-col justify-between p-4 md:px-10">
          <div className="flex gap-5 items-start">
            <div
              className="size-20 md:size-40 bg-blue-400 dark:bg-blue-600 rounded-full flex items-center justify-center"
              title={`${currentUser?.firstName} ${currentUser?.lastName}`}
            >
              <span className="font-bold text-3xl md:text-5xl text-white tracking-wide">
                {currentUser?.firstName.slice(0, 1)}
                {currentUser?.lastName.slice(0, 1)}
              </span>
            </div>
            <div className="dark:text-zinc-100">
              <h3 className="font-bold text-xl md:text-3xl">{`${currentUser?.firstName} ${currentUser?.lastName}`}</h3>
              <p className="font-thin md:font-normal text-lg">
                {currentUser?.email}
              </p>
            </div>
          </div>
          <div className="w-full flex justify-start gap-3 mt-10">
            <Link
              className="flex items-center text-white bg-blue-500 dark:bg-blue-900 py-2 px-3 font-bold hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md transition duration-50"
              to="/my-bookings"
            >
              {t("Header.myBookings")}
            </Link>
            <Link
              className="flex items-center bg-blue-500 dark:bg-blue-900 py-2 text-white px-3 font-bold hover:bg-blue-400 dark:hover:bg-blue-800 rounded-md transition duration-50"
              to="/my-hotels"
            >
              {t("Header.myHotels")}
            </Link>
            <button
              className="flex items-center bg-red-500 dark:bg-red-900 py-2 text-white px-3 font-bold hover:bg-red-400 dark:hover:bg-red-800 rounded-md transition duration-50"
              onClick={() => setIsModalOpen(true)}
            >
              {t("MyProfilePage.deleteAccount")}
            </button>
          </div>
        </div>
        <div className="flex flex-1 md:px-6">
          <EditUserForm currentUser={currentUser} />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={t("BookingCard.cancelBooking")}
      >
        <ModalOperationConfirmation
          operation="delete"
          name="account"
          onConfirm={deleteUserHandler}
          onCancel={() => setIsModalOpen(false)}
          isPending={isPending}
          isSuccess={isSuccess}
        />
      </Modal>
    </section>
  );
};

export default MyProfilePage;
