import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";
import useAuthStore from "@/stores/auth";
import toast, { Toaster } from "react-hot-toast";
import AuthCard from "@/components/shared/AuthCard";
import { host } from "@/utils/constant";

export default function Index() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isMenuSort, setIsMenuSort] = useState(false);
  const [images, setImages] = useState([]);
  const [isMenuFilter, setIsMenuFilter] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSort, setSelectedSort] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [categoryId, setCatgeoryId] = useState(0);
  const productsPerPage = 12;
  const { name, category } = router.query;
  const [variants, setVariants] = useState([]);
  const getCurrentProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filterProductsByCategory().slice(startIndex, endIndex);
  };
  const [auth, setAuth] = useState(false);

  const viewDetail = (slug) => {
    router.push(`/detail/${slug}`);
  };

  const toggleSort = () => {
    setIsMenuSort((prevState) => !prevState);
  };

  const hargaFormatter = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

  const getVariantPrice = (productId) => {
    const variant = variants.find((variant) => variant.produk_id === productId);
    return variant ? variant.harga : "0";
  };

  const toggleFilter = () => {
    setIsMenuFilter((prevState) => !prevState);
  };

  const handleSortSelect = (sortOption) => {
    setSelectedSort(sortOption);
  };

  useEffect(() => {
    const fetchProducts = () => {
      let url = `${host}/produk`;

      switch (selectedSort) {
        case "terbaru":
          url += "?sortCreated=asc";
          break;
        case "terlama":
          url += "?sortCreated=desc";
          break;
        case "a-z":
          url += "?sortName=asc";
          break;
        case "z-a":
          url += "?sortName=desc";
          break;
        default:
          url;
          break;
      }

      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (name) {
            const filteredProducts = data.data.filter((product) =>
              product.nama
                .trim()
                .toLowerCase()
                .includes(name.trim().toLowerCase())
            );
            if (products.length > 0) {
              setProducts(filteredProducts);
            } else {
              setProducts([]);
            }
          } else {
            setProducts(data.data);
          }
        })
        .catch((error) => console.error("Error fetching data:", error));
    };

    const fetchProductsByCategory = async () => {
      try {
        const categoryResponse = await fetch(`${host}/kategori`);
        const categoryData = await categoryResponse.json();
        const selectedCategory = categoryData.data.find(
          (cat) => cat.slug === category
        );

        if (selectedCategory) {
          const productResponse = await fetch(
            `${host}/produk?kategori_id=${selectedCategory.id}`
          );
          const productData = await productResponse.json();
          setProducts(productData.data);
        } else {
          console.error("Category not found");
        }
      } catch (error) {
        console.error("Error fetching products by category:", error);
      }
    };

    const getCategoryId = async () => {
      try {
        const categoryResponse = await fetch(`${host}/kategori`);
        const categoryData = await categoryResponse.json();
        const selectedCategory = categoryData.data.find(
          (cat) => cat.slug === category
        );
        setCatgeoryId(selectedCategory);
      } catch (error) {
        console.error("Error get Catgeory ID variants:", error);
      }
    };

    const fetchVariants = async () => {
      try {
        const response = await axios.get(`${host}/variant`);
        setVariants(response.data.data);
      } catch (error) {
        console.error("Error fetching variants:", error);
      }
    };

    const fetchProductsbySlug = async () => {
      try {
        const response = await axios.get(`${host}/produk?kategori=${category}`);
        setProducts(response.data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (category) {
      fetchProductsbySlug();
      getCategoryId();
    }
    fetch(`${host}/kategori`)
      .then((response) => response.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => console.error("Error fetching data:", error));

    fetch(`${host}/gambar`)
      .then((response) => response.json())
      .then((data) => setImages(data.data))
      .catch((error) => console.error("Error fetching images:", error));

    fetchProducts();
    fetchVariants();
    if (category) {
      fetchProductsByCategory();
    }
  }, [selectedSort, name, category]);

  const getImageUrl = (productId) => {
    const image = images.find((img) => img.produk_id === productId);
    return image
      ? image.url
      : "https://d1yutv2xslo29o.cloudfront.net/product/variant/media/web/910003851_RED_1_5535.webp";
  };

  const handleCategorySelect = (categorySlug) => {
    const index = selectedCategories.indexOf(categorySlug);
    if (index === -1) {
      if (selectedCategories.length < 2) {
        setSelectedCategories([...selectedCategories, categorySlug]);
      } else {
        const [, ...remainingCategories] = selectedCategories;
        setSelectedCategories([...remainingCategories, categorySlug]);
      }
    } else {
      setSelectedCategories(
        selectedCategories.filter((slug) => slug !== categorySlug)
      );
    }
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
  };

  const filterProductsByCategory = () => {
    if (selectedCategories.length === 0) {
      return products;
    } else {
      return products.filter((product) =>
        selectedCategories.includes(product.kategori_id)
      );
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((currentPage) => Math.max(currentPage - 1, 1));
  };

  const goToNextPage = () => {
    const totalPages = Math.ceil(
      filterProductsByCategory().length / productsPerPage
    );
    setCurrentPage((currentPage) => Math.min(currentPage + 1, totalPages));
  };

  const handleToggleWishlist = (productId) => {
    if (wishlist.includes(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const addToWishlist = async (productId) => {
    if (!user) {
      toast.error("Silahkan login terlebih dahulu");
      setAuth(true);
    } else {
      try {
        await axios.post(
          `${host}/wishlist`,
          {
            produk_id: productId,
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        toast.success("Berhasil menambahkan ke wishlist");
      } catch (error) {}
    }
  };

  const removeFromWishlist = (productId) => {
    axios
      .delete(`${host}/wishlist/${index}`)
      .then((response) => {
        setWishlist(response.data.filter((id) => id !== productId));
      })
      .catch((error) => {
        console.error("Error removing from wishlist:", error);
      });
  };

  return (
    <main className="pb-24 pt-24">
      {!auth ? null : <AuthCard setAuth={setAuth} />}
      <Toaster />
      <section
        aria-labelledby="filter-heading"
        className="grid items-center border-b border-t border-gray-200"
      >
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>
        <div className="relative col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl space-x-6 divide-x divide-gray-200 px-4 text-sm sm:px-6 lg:px-8">
            <div>
              <button
                type="button"
                className="group flex items-center font-medium text-gray-700"
                aria-controls="disclosure-1"
                aria-expanded={isMenuFilter ? "true" : "false"}
                aria-haspopup="true"
                onClick={toggleFilter}
              >
                <svg
                  className="mr-2 h-5 w-5 flex-none text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.628 1.601C5.028 1.206 7.49 1 10 1s4.973.206 7.372.601a.75.75 0 01.628.74v2.288a2.25 2.25 0 01-.659 1.59l-4.682 4.683a2.25 2.25 0 00-.659 1.59v3.037c0 .684-.31 1.33-.844 1.757l-1.937 1.55A.75.75 0 018 18.25v-5.757a2.25 2.25 0 00-.659-1.591L2.659 6.22A2.25 2.25 0 012 4.629V2.34a.75.75 0 01.628-.74z"
                    clipRule="evenodd"
                  />
                </svg>
                2 Filters
              </button>
            </div>
            <div className="pl-6">
              <button
                type="button"
                className="text-gray-500"
                onClick={handleClearAll}
              >
                Clear all
              </button>
            </div>
          </div>
        </div>
        {isMenuFilter && (
          <div className="border-t border-gray-200 py-10" id="disclosure-1">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-4 px-4 text-sm sm:px-6 md:gap-x-6 lg:px-8">
              <div className="grid auto-rows-min grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-6">
                <fieldset>
                  <legend className="block font-medium">Category</legend>
                  <div className="space-y-6 pt-6 sm:space-y-4 sm:pt-4">
                    {categories.map((categori) => (
                      <div
                        key={categori.id}
                        className="flex items-center text-base sm:text-sm"
                      >
                        <input
                          id={`category-${categori.id}`}
                          name="category[]"
                          value={categoryId ?? categori.id}
                          defaultValue={categoryId}
                          onChange={() => handleCategorySelect(categori.id)}
                          type="checkbox"
                          checked={selectedCategories.includes(categori.id)}
                          className="h-4 w-4 flex-shrink-0 rounded border-gray-300 text-white focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`category-${categori.id}`}
                          className="ml-3 min-w-0 flex-1 text-gray-600"
                        >
                          {categori.nama}
                        </label>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
        )}
        <div className="col-start-1 row-start-1 py-4">
          <div className="mx-auto flex max-w-7xl justify-end px-4 sm:px-6 lg:px-8">
            <div className="relative inline-block">
              <div className="flex">
                <button
                  type="button"
                  className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                  id="menu-button"
                  aria-expanded={isMenuSort ? "true" : "false"}
                  aria-haspopup="true"
                  onClick={toggleSort}
                >
                  Sort
                  <svg
                    className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              {isMenuSort && (
                <div
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="menu-button"
                  tabIndex={-1}
                >
                  <div className="py-1" role="none">
                    <Link
                      href="#"
                      className={`font-medium ${
                        selectedSort === "terbaru"
                          ? "text-gray-900"
                          : "text-gray-500"
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => handleSortSelect("terbaru")}
                    >
                      Terbaru
                    </Link>
                    <Link
                      href="#"
                      className={`font-medium ${
                        selectedSort === "terlama"
                          ? "text-gray-900"
                          : "text-gray-500"
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => handleSortSelect("terlama")}
                    >
                      Terlama
                    </Link>
                    <Link
                      href="#"
                      className={`font-medium ${
                        selectedSort === "a-z"
                          ? "text-gray-900"
                          : "text-gray-500"
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => handleSortSelect("a-z")}
                    >
                      Alphabet A - Z
                    </Link>
                    <Link
                      href="#"
                      className={`font-medium ${
                        selectedSort === "z-a"
                          ? "text-gray-900"
                          : "text-gray-500"
                      } block px-4 py-2 text-sm`}
                      role="menuitem"
                      tabIndex={-1}
                      onClick={() => handleSortSelect("z-a")}
                    >
                      Alphabet Z - A
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <section
        aria-labelledby="products-heading"
        className="mx-auto max-w-7xl overflow-hidden sm:px-6 lg:px-8"
      >
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>
        <ul className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
          {products.length === 0 ? (
            <div className="flex justify-center items-center h-40">
              <p className="text-gray-500">Tidak ada Product</p>
            </div>
          ) : selectedCategories.length === 0 ? (
            getCurrentProducts().map((product) => {
              const slug = product.slug;
              return (
                <li key={product.id} className="flex py-6">
                  <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                      <img
                        src={getImageUrl(product.id)}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 font-medium text-gray-900">
                      {product.nama}
                    </h3>
                    <p>{hargaFormatter.format(getVariantPrice(product.id))}</p>{" "}
                    <button
                      onClick={() => handleToggleWishlist(product.id)}
                      className="text-white font-black bg-[#fbcfe8] px-4 py-2 rounded-md hover:bg-[#f9a8d4] focus:outline-none focus:ring-2 focus:ring-[#ec4899] focus:ring-opacity-50 mr-5"
                    >
                      Add Wishlist
                    </button>
                    <button
                      onClick={() => viewDetail(slug)}
                      className="text-white font-black ml-5 bg-[#bfdbfe] px-4 py-2 rounded-md hover:bg-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50"
                    >
                      Detail
                    </button>
                  </div>
                </li>
              );
            })
          ) : (
            filterProductsByCategory().map((product) => {
              const slug = product.slug;
              return (
                <li key={product.id} className="flex py-6">
                  <div className="group relative border-b border-r border-gray-200 p-4 sm:p-6">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                      <img
                        src={getImageUrl(product.id)}
                        alt={product.imageAlt}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <h3 className="mt-4 font-medium text-gray-900">
                      {product.nama}
                    </h3>
                    <p>{hargaFormatter.format(getVariantPrice(product.id))}</p>{" "}
                    <button
                      onClick={() => handleToggleWishlist(product.id)}
                      className="text-white font-black bg-[#fbcfe8] px-4 py-2 rounded-md hover:bg-[#f9a8d4] focus:outline-none focus:ring-2 focus:ring-[#ec4899] focus:ring-opacity-50 mr-5"
                    >
                      Add Wishlist
                    </button>
                    <button
                      onClick={() => viewDetail(slug)}
                      className="text-white font-black ml-5 bg-[#bfdbfe] px-4 py-2 rounded-md hover:bg-[#93c5fd] focus:outline-none focus:ring-2 focus:ring-[#3b82f6] focus:ring-opacity-50"
                    >
                      Detail
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
      </section>
      <nav
        aria-label="Pagination"
        className="mx-auto mt-6 flex max-w-7xl justify-between px-4 text-sm font-medium text-gray-700 sm:px-6 lg:px-8"
      >
        <div className="min-w-0 flex-1">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1} // Menonaktifkan tombol jika sudah di halaman pertama
            className="inline-flex h-10 items-center rounded-md border border-gray-300 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
          >
            Previous
          </button>
        </div>
        <div className="hidden space-x-2 sm:flex">
          {Array.from(
            {
              length: Math.ceil(
                filterProductsByCategory().length / productsPerPage
              ),
            },
            (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`inline-flex h-10 items-center rounded-md border ${
                  currentPage === i + 1
                    ? "border-indigo-600 ring-1 ring-indigo-600 bg-white"
                    : "border-gray-300"
                } px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
        <div className="flex min-w-0 flex-1 justify-end">
          <button
            onClick={goToNextPage}
            disabled={
              currentPage ===
              Math.ceil(filterProductsByCategory().length / productsPerPage)
            } // Menonaktifkan tombol jika sudah di halaman terakhir
            className="inline-flex h-10 items-center rounded-md border border-gray-300 px-4 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-opacity-25 focus:ring-offset-1 focus:ring-offset-indigo-600"
          >
            Next
          </button>
        </div>
      </nav>
    </main>
  );
}
