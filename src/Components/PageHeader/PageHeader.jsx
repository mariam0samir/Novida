const PageHeader = ({
  image,
  title,
  description,
}) => {
  return (
    <section className="w-full mb-3">
      <div
        className="
          relative
          w-full
          min-h-[380px]
          md:min-h-[500px]
          overflow-hidden
         
          flex
          items-end
        "
      >
        {/* Background Image */}
        <img
          src={image}
          alt={title}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
            z-0
          "
        />

        {/* Dark Overlay */}
        <div
          className="
            absolute
            inset-0
            z-10
            bg-gradient-to-t
            from-black/95
            via-black/35
            to-black/5
          "
        />

        {/* Content */}
        <div
          className="
            relative
            z-20
            w-full
            px-5
            sm:px-8
            md:px-12
            pb-8
            sm:pb-10
            md:pb-12
            text-start
          "
        >
          <div className="max-w-[850px]">
            <h1
              className="
                text-white
                text-3xl
                sm:text-4xl
                md:text-5xl
                font-bold
                mb-4
              "
            >
              {title}
            </h1>

            {description && (
              <p
                className="
                  text-white/90
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-7
                  md:leading-8
                "
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHeader;
