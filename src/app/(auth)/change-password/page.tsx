import CreateNewPassword from "./create-new-password-form";

function CreatePassword() {
  return (
    <>
      <header className="mb-3 text-center">
        <h1 className="mb-3 font-bold lg:text-xl">Enter new password!</h1>
        <p className="text-sm">Please enter a password for your security.</p>
      </header>

      <main>
        <CreateNewPassword />
      </main>

    </>
  );
}

export default CreatePassword;
