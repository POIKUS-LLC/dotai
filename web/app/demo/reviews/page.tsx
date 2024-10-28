"use client"

import * as React from "react"
import { MessageCircle, Share2, ThumbsUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  PKSReviewCard,
  PKSReviewCardAuthor,
  PKSReviewCardDescription,
  PKSReviewCardFooter,
  PKSReviewCardFooterAction,
  PKSReviewCardFooterActions,
  PKSReviewCardHeader,
  PKSReviewCardTitle,
  ReviewSection,
  ReviewSectionDescription,
  ReviewSectionFooter,
  ReviewSectionHeader,
  ReviewSectionReviews,
} from "@/components/poikus/reviews"

const DEMO_LOGO =
  "https://www.logo.wine/a/logo/Tesla%2C_Inc./Tesla%2C_Inc.-Wordmark-Black-Logo.wine.svg"
const DEMO_AVATAR = "https://github.com/shadcn.png"

export default function ReviewsPage() {
  return (
    <ReviewSection className="p-6 ">
      <ReviewSectionDescription>
        See what our customers are saying about our products
      </ReviewSectionDescription>
      <ReviewSectionHeader>Customer Reviews</ReviewSectionHeader>

      <ReviewSectionReviews className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* Basic Review Card */}
        <PKSReviewCard rating={4}>
          <PKSReviewCardAuthor
            name="Sarah Johnson"
            title="Designer"
            avatar={DEMO_AVATAR}
          />
          <PKSReviewCardDescription>
            A straightforward review with just the essentials. Great product
            that does what it promises.
          </PKSReviewCardDescription>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>Simple and Effective!</PKSReviewCardTitle>
          </PKSReviewCardHeader>
        </PKSReviewCard>

        {/* Detailed Review with Company */}
        <PKSReviewCard rating={5}>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>Revolutionary Technology</PKSReviewCardTitle>
          </PKSReviewCardHeader>
          <PKSReviewCardDescription>
            The integration of AI technology has significantly improved our
            autonomous driving capabilities. The system's ability to learn and
            adapt in real-time has exceeded our expectations.
          </PKSReviewCardDescription>
          <PKSReviewCardAuthor
            name="Elon Musk"
            title="CEO"
            company="Tesla"
            avatar={DEMO_AVATAR}
            companyLogo={{
              src: DEMO_LOGO,
              alt: "Tesla logo",
              width: 90,
              height: 60,
            }}
            companyUrl="https://tesla.com"
          />
        </PKSReviewCard>

        {/* Review with Actions */}
        <PKSReviewCard rating={4.5}>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>Outstanding Service!</PKSReviewCardTitle>
          </PKSReviewCardHeader>
          <PKSReviewCardDescription>
            The customer support team went above and beyond to help resolve our
            issues. Quick response times and professional service throughout.
          </PKSReviewCardDescription>
          <PKSReviewCardAuthor
            name="David Chen"
            title="CTO"
            company="TechCorp"
            avatar={DEMO_AVATAR}
            companyLogo={{
              src: DEMO_LOGO,
              alt: "Company logo",
              width: 90,
              height: 60,
            }}
          />
          <PKSReviewCardFooter>
            <PKSReviewCardFooterActions>
              <PKSReviewCardFooterAction variant="ghost">
                <ThumbsUp className="w-4 h-4 mr-2" />
                Helpful
              </PKSReviewCardFooterAction>
              <PKSReviewCardFooterAction variant="ghost">
                <MessageCircle className="w-4 h-4 mr-2" />
                Reply
              </PKSReviewCardFooterAction>
              <PKSReviewCardFooterAction variant="ghost">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </PKSReviewCardFooterAction>
            </PKSReviewCardFooterActions>
          </PKSReviewCardFooter>
        </PKSReviewCard>

        {/* Verified Purchase Review */}
        <PKSReviewCard rating={3}>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>Good but could be better</PKSReviewCardTitle>
          </PKSReviewCardHeader>
          <PKSReviewCardDescription>
            The product has some great features, but there's definitely room for
            improvement. Battery life could be longer, and the interface needs
            some work.
          </PKSReviewCardDescription>
          <PKSReviewCardAuthor
            name="Alex Thompson"
            avatar={DEMO_AVATAR}
            containerClassNames={{
              avatar: {
                container: "border-green-500",
                image: "border-2 border-green-500",
              },
            }}
          />
          <PKSReviewCardFooter>
            <PKSReviewCardFooterActions>
              <PKSReviewCardFooterAction
                variant="outline"
                className="text-green-500"
              >
                Verified Purchase
              </PKSReviewCardFooterAction>
            </PKSReviewCardFooterActions>
          </PKSReviewCardFooter>
        </PKSReviewCard>

        {/* Expert Review */}
        <PKSReviewCard rating={5}>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>
              Professional Grade Equipment
            </PKSReviewCardTitle>
          </PKSReviewCardHeader>
          <PKSReviewCardDescription>
            As a professional photographer, I'm extremely particular about my
            equipment. This camera exceeds all expectations in terms of image
            quality, build, and features.
          </PKSReviewCardDescription>
          <PKSReviewCardAuthor
            name="Emily Rodriguez"
            title="Professional Photographer"
            company="National Geographic"
            avatar={DEMO_AVATAR}
            companyLogo={{
              src: DEMO_LOGO,
              alt: "Company logo",
              width: 120,
              height: 60,
            }}
            companyUrl="https://nationalgeographic.com"
          />
        </PKSReviewCard>

        {/* Critical Review */}
        <PKSReviewCard rating={2}>
          <PKSReviewCardHeader>
            <PKSReviewCardTitle>
              Needs Significant Improvements
            </PKSReviewCardTitle>
          </PKSReviewCardHeader>
          <PKSReviewCardDescription>
            While the concept is promising, the execution falls short. The
            software is buggy, and customer support has been unresponsive. I
            hope these issues will be addressed in future updates.
          </PKSReviewCardDescription>
          <PKSReviewCardAuthor
            name="Michael Foster"
            title="Software Engineer"
            avatar={DEMO_AVATAR}
          />
          <PKSReviewCardFooter>
            <PKSReviewCardFooterActions>
              <PKSReviewCardFooterAction variant="destructive">
                Report Issue
              </PKSReviewCardFooterAction>
            </PKSReviewCardFooterActions>
          </PKSReviewCardFooter>
        </PKSReviewCard>
      </ReviewSectionReviews>
      <ReviewSectionFooter>
        Want to add your review?
        <Button variant="outline">Add Review</Button>
      </ReviewSectionFooter>
    </ReviewSection>
  )
}
