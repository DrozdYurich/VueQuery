import { useRouter } from "vue-router";

export default function () {
  const router = useRouter();
  const gotoMy = () => {
    router.push({ name: "home" });
  };
  const gotoPage = () => {
    router.push({ name: "page" });
  };
  return {
    gotoMy,
    gotoPage,
  };
}
