import { useRouter } from "next/router";``
import UpdateFormPromo from "@/components/promo/UpdateFormPromo";

export default function Index() {
  const router = useRouter();
  const { id } = router.query;
  const promoId = id || null;
  return (
    <div>
      <UpdateFormPromo promoId={promoId} />
    </div>
  );
}
