HISTORIA
White Paper v3.1 — The Registry of Epistemological Truth
Decentralized Protocol for Collective Memory on Sui

Version: 3.1
Date: March 2026

1. Philosophy & Vision
The distinction between Reality and Truth

The foundation of HISTORIA rests on an essential philosophical nuance: the distinction between Reality and Truth.

Reality exists independently of the observer.

Truth, on the other hand, is a human construction: an interpretation of the world validated by knowledge, evidence, methods, and the consensus of a given era.

HISTORIA does not claim to capture absolute reality.
HISTORIA archives what a collectivity considers true at a given moment: the Truth of the Moment.

Example: the shape of the Earth

Throughout history, different conceptions of the Earth’s shape have been held as true by their contemporaries.

This observation reveals a fundamental idea:
what we call truth evolves with intellectual frameworks, instruments of knowledge, and the social consensus of a given era.

HISTORIA does not aim to judge these truths retroactively.
Its role is to record them.

Our vision

HISTORIA is a chronology of the evolution of human thought.

By archiving an economic and social consensus at a moment T, the protocol protects each stage of our understanding against forgetting, alteration, or retroactive revisionism.

We are building a system in which:

truth is verified, not imposed;

economic alignment encourages honesty;

epistemological humility is the rule: what we consider true today may become tomorrow a historical curiosity.

2. The problem
Centralized revisionism

Current information systems — collaborative encyclopedias, institutional databases, state archives, private platforms — are mutable.

A past truth can be erased, corrected, reformulated, or replaced to fit present interests.

It then becomes difficult to know not only what was said,
but above all what was considered true at a given time.

Crisis of trust

The absence of skin in the game in information verification allows:

manipulation campaigns;

artificial consensus;

the use of bots and synthetic identities;

the diffusion of narratives at no real cost for their authors.

When no risk is associated with taking a position, the value of collective validation collapses.

Loss of historical context

We gradually lose the memory of our own frameworks of thought:

what we believed;

why we believed it;

how our certainties evolved.

Without this memory, we sometimes preserve the conclusions, but we lose the history of their formation.

3. The solution: the HISTORIA protocol

HISTORIA introduces a decentralized consensus protocol designed to archive the truth of a given moment.

It relies on:

a commit–reveal voting mechanism;

a staking system in SUI;

an economic redistribution model;

the immutability provided by the Sui blockchain.

Each submission takes the form of a claim: a clear, contextualized, and categorized statement submitted to collective judgment.

The result of the process does not claim to produce absolute truth.
It records an archived truth, meaning the state of a consensus at a given moment.

4. Consensus mechanism

The protocol relies on a hidden-commit vote structured in four phases.

1. Proposal

A user submits a claim with:

a description;

a context;

a category;

a stake in SUI;

a commit phase duration;

a reveal phase duration;

a cryptographic hash corresponding to their own initial vote.

The proposer automatically becomes the first voter.

2. Commit

During the commit phase, voters submit:

their stake;

a cryptographically sealed vote.

The vote is not revealed publicly at this stage.
Only a hash is recorded on-chain.

The hash is computed as follows:

SHA2-256( bcs(address) || vote || secret )

This ensures that:

the vote remains invisible;

no trend can be observed;

it is not possible to opportunistically follow the majority as it forms.

3. Reveal

During the reveal phase, voters reveal:

their vote;

their secret.

The contract verifies that the revealed data matches the original commitment.

Participants who fail to reveal lose their stake.

4. Resolution

Once the reveal phase is over, any user can trigger the resolution of the event.

The protocol then determines:

the final result;

the majority side;

the rewards claimable individually.

Winners recover their stake and receive a share of the stakes lost by the losing side.
Rewards are then claimed individually through a dedicated function.

5. Technical architecture on Sui

HISTORIA is implemented in Move on the Sui blockchain.

Object model

The protocol relies on a main shared object, Historia, which contains:

the events table;

the commits table;

the table of already claimed rewards;

the global event counter;

the founder address.

Each claim is represented on-chain by an EventRecord, containing:

description;

context;

category;

proposer;

stake per voter;

commit and reveal timestamps;

event status;

vote counters;

outcome;

stake pool;

reward per winner.

Structured data

The protocol uses Sui Tables to organize state:

events: Table<u64, EventRecord>
commits: Table<CommitKey, CommitRecord>
rewards_claimed: Table<CommitKey, bool>

This architecture provides:

explicit state management;

deterministic access;

clear logical structure.

On-chain events

To allow indexing and frontend reading, the protocol emits:

EventCreated

VoteCommitted

VoteRevealed

EventFinalized

RewardClaimed

HISTORIA is therefore not only an executable contract,
but also a readable, observable, and indexable memory layer.

6. Protocol parameters

The current protocol defines:

a minimum stake to vote;

a minimum stake to propose;

a maximum description length;

a maximum context length;

a minimum duration per phase;

a maximum total duration;

a predefined set of categories.

Supported categories

Claims may belong to:

Science

Economics

Politics

Society

Technology

Current economic parameters

In the current contract configuration, minimum values are set at a reduced level, in test mode, to facilitate experimentation on Sui.

These values should not be considered final.
Final parameters depend on deployment context and desired Sybil resistance.

7. Economic model

The economic model of HISTORIA is based on a simple intuition:

A collective truth has value only if those who validate it assume real risk.

General principle

Each participant commits a stake.

After the vote:

losers lose their stake;

winners recover their stake and share the losing pool;

non-revealers are penalized;

a small fee is taken.

Distribution

In a normal resolution:

1% of the losing pool goes to the proposer;

1% goes to the founder / protocol;

the rest is distributed to winners.

Special cases

Tie
→ revealers get their stake back

Unanimity
→ revealers get their stake back

No reveal
→ event is voided

8. Game theory

HISTORIA creates a Schelling-game-like environment where the rational strategy is to vote according to what one believes will be the strongest consensus based on available evidence.

The system encourages:

serious evaluation of claims;

anticipation of collective judgment;

avoidance of impulsive voting.

Commit–reveal is essential because:

majority cannot be followed;

coordination is harder;

vote buying is inefficient.

Economic alignment creates epistemic discipline.

9. Security
Sybil resistance

One wallet = one vote
but each vote costs SUI.

Creating many wallets is not free.

Resistance is economic, not identity-based.

Vote buying resistance

Commit hides the vote.

Bribery cannot be verified.

Collusion resistance

Votes are hidden during commit.

Coordination is difficult.

Immutability

On-chain state is permanent.

No retroactive editing.

Each event becomes part of collective memory.

10. Scalability and reward distribution

Resolution only computes the result.

Rewards are claimed later via:

claim_reward()

Advantages:

scalable

modular

safer

cheaper

11. User experience

The user should only:

read

vote

reveal

claim

Commit–reveal remains hidden.

HISTORIA is not a dashboard.

It is a memory interface.

12. Limits

HISTORIA does not capture Reality.

It captures a situated consensus.

Limits:

low participation

manipulation possible

depends on voters

majority ≠ absolute truth

This is intentional.

13. Conclusion

HISTORIA is not only a technological tool.

It is a philosophical infrastructure of memory.

By recording not only statements but the way they are validated, HISTORIA becomes:

a defense against revisionism

an archive of intellectual progress

a mirror of human thought

a foundation for future understanding

We do not capture Reality.

We archive the Truth of the Moment.

Truth is verified, not dictated.

Document Version: 3.1
Last Updated: March 2026
Designed for immutable anchoring on the Sui blockchain
