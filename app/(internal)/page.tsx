import { RegistryItemCard } from "@/components/registry-item-card";
import registry from "@/registry.json";
import { headers } from "next/headers";

export default async function Home() {
  const headersList = await headers();
  const domain =
    process.env.DOMAIN?.replace(/\/$/, "") || headersList.get("host");
  const registryItems = [...registry.items];
  // extracts the starter kit from the registry items and removes it from the list
  // this is to ensure that the starter kit is always at the top of the list
  const starterKitIndex = registryItems.findIndex(
    (item) => item.name === "starter-kit"
  );
  const starterKit =
    starterKitIndex !== -1 ? registryItems.splice(starterKitIndex, 1)[0] : null;
  console.log(
    "starterKit",
    starterKit,
    "registryItems",
    registryItems,
    "domain",
    domain
  );
  return (
    <div className="container p-6">
      <div className="space-y-6">
        {starterKit && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Start from Scratch</h2>
            <RegistryItemCard
              title={starterKit.title}
              description={starterKit.description}
              url={domain + "/r/" + starterKit.name + ".json"}
            ></RegistryItemCard>
          </section>
        )}
        {registryItems.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-xl font-bold">Start from a Template</h2>
            {registryItems.map((item) => (
              <RegistryItemCard
                key={item.name}
                title={item.title}
                description={item.description}
                previewUrl={"/" + item.name}
                url={domain + "/r/" + item.name + ".json"}
              ></RegistryItemCard>
            ))}
          </section>
        )}
      </div>
    </div>
  );
}
