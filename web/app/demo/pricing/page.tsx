"use client"

import { Info } from "lucide-react"

import {
  PKSPricingCard,
  PKSPricingCardAction,
  PKSPricingCardBadge,
  PKSPricingCardDescription,
  PKSPricingCardFeatures,
  PKSPricingCardFeaturesHeader,
  PKSPricingCardFooter,
  PKSPricingCardHeader,
  PKSPricingCardPrice,
  PKSPricingCardTitle,
  PKSPricingSection,
  PKSPricingSectionContent,
  PKSPricingSectionDescription,
  PKSPricingSectionFooter,
  PKSPricingSectionHeader,
} from "@/components/poikus/pricing"

const features = {
  free: [
    { text: "1 Project", included: true },
    { text: "Basic Analytics", included: true },
    { text: "24/7 Support", included: false },
    { text: "Custom Domain", included: false },
    { text: "API Access", included: false },
  ],
  pro: [
    { text: "5 Projects", included: true },
    { text: "Advanced Analytics", included: true },
    { text: "24/7 Priority Support", included: true },
    { text: "Custom Domain", included: true },
    { text: "API Access", included: false },
  ],
  enterprise: [
    { text: "Unlimited Projects", included: true },
    { text: "Enterprise Analytics", included: true },
    { text: "24/7 VIP Support", included: true },
    { text: "Custom Domain", included: true },
    { text: "API Access", included: true },
    { text: "API Access Enterprise", included: true },
  ],
}

export default function PricingPage() {
  return (
    <PKSPricingSection>
      <PKSPricingSectionHeader>
        <h2 className="text-3xl font-bold tracking-tight">
          Simple, transparent pricing
        </h2>
      </PKSPricingSectionHeader>
      <PKSPricingSectionDescription>
        Choose the perfect plan for your needs. All plans include a 14-day free
        trial.
      </PKSPricingSectionDescription>

      <PKSPricingSectionContent>
        {/* Free Plan */}
        <PKSPricingCard>
          <PKSPricingCardHeader>
            <PKSPricingCardTitle>Free</PKSPricingCardTitle>
            <PKSPricingCardDescription>
              Perfect for trying out our platform
            </PKSPricingCardDescription>
            <PKSPricingCardPrice price={0} period="month" />
          </PKSPricingCardHeader>
          <PKSPricingCardFeatures
            features={features.free}
            header={
              <PKSPricingCardFeaturesHeader>
                What's included in Free:
              </PKSPricingCardFeaturesHeader>
            }
          />
          <PKSPricingCardFooter>
            <PKSPricingCardAction href="/signup">
              Get Started
            </PKSPricingCardAction>
          </PKSPricingCardFooter>
        </PKSPricingCard>

        {/* Pro Plan */}
        <PKSPricingCard isHighlighted isPopular>
          <PKSPricingCardBadge>Most Popular</PKSPricingCardBadge>
          <PKSPricingCardHeader>
            <PKSPricingCardTitle>Pro</PKSPricingCardTitle>
            <PKSPricingCardDescription>
              Perfect for professional developers
            </PKSPricingCardDescription>
            <PKSPricingCardPrice price={29} period="month" />
          </PKSPricingCardHeader>
          <PKSPricingCardFeatures
            features={features.pro}
            header={
              <PKSPricingCardFeaturesHeader>
                Everything in Free, plus:
              </PKSPricingCardFeaturesHeader>
            }
          />
          <PKSPricingCardFooter>
            <PKSPricingCardAction href="/signup">
              Start Free Trial
            </PKSPricingCardAction>
          </PKSPricingCardFooter>
        </PKSPricingCard>

        {/* Enterprise Plan */}
        <PKSPricingCard>
          <PKSPricingCardHeader>
            <PKSPricingCardTitle>Enterprise</PKSPricingCardTitle>
            <PKSPricingCardDescription>
              Perfect for large organizations
            </PKSPricingCardDescription>
            <PKSPricingCardPrice price={99} period="month" />
          </PKSPricingCardHeader>
          <PKSPricingCardFeatures
            features={features.enterprise}
            header={
              <PKSPricingCardFeaturesHeader>
                Everything in Pro, plus:
              </PKSPricingCardFeaturesHeader>
            }
          />
          <PKSPricingCardFooter>
            <PKSPricingCardAction href="/contact">
              Contact Sales
            </PKSPricingCardAction>
          </PKSPricingCardFooter>
        </PKSPricingCard>
      </PKSPricingSectionContent>

      <PKSPricingSectionFooter>
        <div className="flex flex-col items-center gap-4">
          <p className="text-center text-sm text-muted-foreground">
            All prices are in USD and billed monthly. Need a custom plan?{" "}
            <a
              href="/contact"
              className="font-medium underline underline-offset-4"
            >
              Contact us
            </a>
          </p>
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Prices may vary based on your region
            </span>
          </div>
        </div>
      </PKSPricingSectionFooter>
    </PKSPricingSection>
  )
}
