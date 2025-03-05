function Success() {
  return (
    <div className="grid gap-y-6 text-center">
      {/* <Image
        src="/images/login-success.png"
        alt="a paper with a blue complete stamp"
        width={150}
        height={150}
        className="mx-auto"
      /> */}

      <div>
        <h1 className="mb-4 text-2xl font-extrabold text-white">
          Register Successfully!
        </h1>
        <p className="text-white">
          You have successfully Registered your details and now you are ready to
          go.
        </p>
      </div>

      {/* <div className="flex justify-center">
        <Link
          href="/sign-in"
          className="inline-block w-fit rounded-xl bg-[#0077B6] px-10 py-3 text-xl font-bold text-white transition-all duration-150 hover:bg-[#0077B6]/90"
        >
          Continue
        </Link>
      </div> */}
    </div>
  );
}

export default Success;
